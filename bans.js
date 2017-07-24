'use strict';

const Datastore = require('nedb-promise');

const bans = new Datastore({
	filename: 'data/bans.db',
	autoload: true
});

bans.ensureIndex({
	fieldName: 'id',
	unique: true
});

const ban = (user, reason) =>
	bans.insert(Object.assign({}, user, { reason })).then(() => reason);

const unban = user =>
	bans.remove({ id: user.id });

module.exports = {
	ban,
	unban
};
