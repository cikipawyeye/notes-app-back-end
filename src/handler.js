/* eslint-disable object-curly-spacing */
import { nanoid } from 'nanoid';
import notes from './notes.js';

// new note
const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;
  const id = nanoid(16);

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  notes.push({
    title, tags, body, id, createdAt, updatedAt,
  });

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code = 200;
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code = 500;
  return response;
};

// get all notes
const getAllNotesHandler = (req, h) => {
  const response = h.response({
    status: 'success',
    data: {notes},
  });

  response.code = 200;
  return response;
};

// show note by id
const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const note = notes.filter((note) => note.id === id)[0];

  if (typeof note !== 'undefined') {
    const response = h.response({
      status: 'success',
      data: {note},
    });

    response.code = 200;
    return response;
  }

  const response = h.response({
    status: 'fail',
    data: 'Catatan tidak ditemukan',
  });

  response.code = 404;
  return response;
};

// edit note by id
const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index > -1) {
    const { title, tags, body } = req.payload;
    const updatedAt = new Date().toISOString();

    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });

    response.code = 200;
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });

  response.code = 404;
  return response;
};

// delete note by id
const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index > -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

    response.code = 200;
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menghapus catatan. Id tidak ditemukan',
  });

  response.code = 404;
  return response;
};

export {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
