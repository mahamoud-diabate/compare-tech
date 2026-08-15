'use strict';

// Tests unitaires de la couche d'authentification (auth.js) : hachage scrypt
// et JWT HS256. Aucune dépendance externe ni connexion MongoDB requise.
const { test } = require('node:test');
const assert = require('node:assert');
const { hashPassword, verifyPassword, signToken, verifyToken } = require('../auth');

test('hashPassword produit un hash "sel:clé" au format scrypt', async () => {
  const h = await hashPassword('mon-super-mdp');
  // sel = 16 octets hex (32 chars) ; clé = 64 octets hex (128 chars)
  assert.match(h, /^[0-9a-f]{32}:[0-9a-f]{128}$/);
});

test('deux hashs du même mot de passe diffèrent (sel aléatoire)', async () => {
  const a = await hashPassword('same-password');
  const b = await hashPassword('same-password');
  assert.notStrictEqual(a, b);
});

test('verifyPassword accepte le bon mot de passe', async () => {
  const h = await hashPassword('correct-horse-battery');
  assert.strictEqual(await verifyPassword('correct-horse-battery', h), true);
});

test('verifyPassword rejette un mauvais mot de passe', async () => {
  const h = await hashPassword('correct-horse-battery');
  assert.strictEqual(await verifyPassword('wrong-horse-battery', h), false);
});

test('signToken produit un JWT en trois parties', () => {
  const t = signToken({ sub: 'u1', username: 'admin' }, 'un-secret-suffisamment-long');
  assert.strictEqual(t.split('.').length, 3);
});

test('verifyToken accepte un jeton valide et renvoie le payload', () => {
  const t = signToken({ sub: 'u1', username: 'admin' }, 'un-secret-suffisamment-long');
  const p = verifyToken(t, 'un-secret-suffisamment-long');
  assert.ok(p);
  assert.strictEqual(p.username, 'admin');
  assert.strictEqual(p.sub, 'u1');
});

test('verifyToken rejette un jeton signé avec un autre secret', () => {
  const t = signToken({ sub: 'u1' }, 'secret-A');
  assert.strictEqual(verifyToken(t, 'secret-B'), null);
});

test('verifyToken rejette un payload falsifié (signature invalide)', () => {
  const t = signToken({ sub: 'u1', role: 'admin' }, 'secret');
  const [h, p, sig] = t.split('.');
  const forged = Buffer.from(JSON.stringify({ sub: 'u1', role: 'user' })).toString('base64url');
  assert.strictEqual(verifyToken(`${h}.${forged}.${sig}`, 'secret'), null);
});

test('verifyToken rejette un jeton expiré', () => {
  const t = signToken({ sub: 'u1' }, 'secret', -10);
  assert.strictEqual(verifyToken(t, 'secret'), null);
});

test('verifyToken rejette une chaîne invalide ou tronquée', () => {
  assert.strictEqual(verifyToken('pas-un-jwt', 'secret'), null);
  assert.strictEqual(verifyToken('', 'secret'), null);
  assert.strictEqual(verifyToken('a.b', 'secret'), null);
  assert.strictEqual(verifyToken(null, 'secret'), null);
});
