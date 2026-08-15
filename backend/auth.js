'use strict';

// Authentification sans dépendance externe : hachage de mot de passe avec
// scrypt (crypto natif) et JWT signé en HMAC-SHA256 (HS256). Les deux
// algorithmes sont standards et fournis par Node, pas de package à installer.
const crypto = require('crypto');

const SCRYPT_KEYLEN = 64;

// Hash un mot de passe avec un sel aléatoire. Format stocké : "salt:hash".
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, (err, key) => {
      if (err) return reject(err);
      resolve(`${salt}:${key.toString('hex')}`);
    });
  });
}

// Vérifie un mot de passe contre le hash stocké (comparaison à temps constant).
function verifyPassword(password, stored) {
  return new Promise((resolve, reject) => {
    const idx = String(stored).indexOf(':');
    if (idx <= 0) return resolve(false);
    const salt = stored.slice(0, idx);
    const expected = stored.slice(idx + 1);
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, (err, key) => {
      if (err) return reject(err);
      const actual = Buffer.from(key);
      const wanted = Buffer.from(expected, 'hex');
      if (actual.length !== wanted.length) return resolve(false);
      resolve(crypto.timingSafeEqual(actual, wanted));
    });
  });
}

function b64url(input) {
  return Buffer.from(input).toString('base64url');
}

function fromB64url(input) {
  return Buffer.from(input, 'base64url').toString();
}

// Signe un JWT HS256 (header.payload.signature). Standard, vérifiable par tout
// outil tiers. `expiresInSeconds` par défaut : 24 h.
function signToken(payload, secret, expiresInSeconds = 86400) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };

  const h = b64url(JSON.stringify(header));
  const p = b64url(JSON.stringify(body));
  const sig = crypto.createHmac('sha256', secret).update(`${h}.${p}`).digest('base64url');
  return `${h}.${p}.${sig}`;
}

// Vérifie la signature (temps constant) et l'expiration d'un JWT.
// Retourne le payload décodé, ou null si invalide/expiré.
function verifyToken(token, secret) {
  try {
    const parts = String(token).split('.');
    if (parts.length !== 3) return null;
    const [h, p, sig] = parts;

    const expected = crypto.createHmac('sha256', secret).update(`${h}.${p}`).digest();
    const provided = Buffer.from(sig, 'base64url');
    if (provided.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(provided, expected)) return null;

    const body = JSON.parse(fromB64url(p));
    if (typeof body.exp !== 'number') return null;
    if (Math.floor(Date.now() / 1000) > body.exp) return null;
    return body;
  } catch {
    return null;
  }
}

module.exports = { hashPassword, verifyPassword, signToken, verifyToken };
