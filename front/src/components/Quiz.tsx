import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { SessionContext } from '../contexts/sessionContext';

export default function Quiz() {
  const { CreateSession } = useContext(SessionContext);
  const handleCreateRoom = async (event: any) => {
    event.preventDefault();
    CreateSession('Your Session Title');
  };

  return (
    <div>
      <h1>Quiz</h1>
      <form
        className="flex items-center justify-center gap-x-6"
        onSubmit={handleCreateRoom}
      >
        <label htmlFor="room" className="sr-only">
          Créer une session
        </label>
        <div>
          <button
            type="submit"
            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:text-sm sm:leading-6"
          >
            Créer un quizz
          </button>
        </div>
      </form>
    </div>
  );
}
