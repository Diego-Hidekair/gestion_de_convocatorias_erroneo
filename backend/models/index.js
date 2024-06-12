// backend/models/index.js
const Usuario = require('./Usuario');
const Convocatoria = require('./Convocatoria');
const Documento = require('./Documento');
const FirmaDigital = require('./FirmaDigital');
const HistorialDocumento = require('./HistorialDocumento');

// Relaciones
Convocatoria.hasMany(Documento, { foreignKey: 'convocatoria_id' });
Documento.belongsTo(Convocatoria, { foreignKey: 'convocatoria_id' });

Documento.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Documento, { foreignKey: 'usuario_id' });

FirmaDigital.belongsTo(Documento, { foreignKey: 'documento_id' });
Documento.hasMany(FirmaDigital, { foreignKey: 'documento_id' });

FirmaDigital.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(FirmaDigital, { foreignKey: 'usuario_id' });

HistorialDocumento.belongsTo(Documento, { foreignKey: 'documento_id' });
Documento.hasMany(HistorialDocumento, { foreignKey: 'documento_id' });

HistorialDocumento.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(HistorialDocumento, { foreignKey: 'usuario_id' });

module.exports = {
  Usuario,
  Convocatoria,
  Documento,
  FirmaDigital,
  HistorialDocumento,
};
