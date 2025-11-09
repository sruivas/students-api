// api/students/[id].js
const students = require('../../data/students.json');

module.exports = (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Obtener el ID de la URL
  const { id } = req.query;
  const studentId = parseInt(id);

  // Validar ID
  if (isNaN(studentId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // Buscar estudiante
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ 
      error: 'Estudiante no encontrado',
      id: studentId
    });
  }

  // Devolver estudiante
  return res.status(200).json(student);
};