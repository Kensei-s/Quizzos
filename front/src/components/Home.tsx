import { useContext, useEffect, useState, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { List, X } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../contexts/sessionContext';
import type { UserData } from '../contexts/socketContext';
import { SocketContext } from '../contexts/socketContext';

const navigation = [{ name: 'Devenir un Quizzos', href: '/register' }];

export default function Home() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserLogIn, setisUserLogIn] = useState(false);
  const [roomKey, setRoomKey] = useState('');
  const { activeSession, LeaveSession } = useContext(SessionContext);
  const myUser: UserData = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        if (myUser && myUser.id) {
          setisUserLogIn(true);
        }
      } catch (error) {
        toast.error('Connexion échoué!');
      }
    };
    checkUserLogin();
  }, []);

  const handleLogout = async (event: any) => {
    event.preventDefault();
    try {
      if (activeSession) {
        LeaveSession(myUser, activeSession.roomkey);
      }
      setisUserLogIn(false);
      localStorage.removeItem('user');
      toast.success('Déconnexion réussie!');
    } catch (error) {
      toast.error('Déconnexion échouée!');
    }
  };

  const handleJoinRoom = async (event: any) => {
    event.preventDefault();
    try {
      setTimeout(() => {
        navigate(`/game/${roomKey}`);
      }, 600);
    } catch (error) {
      toast.error('Déconnexion échouée !');
    }
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <List className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map(item => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
              >
                {item.name}
              </Link>
            ))}
            {myUser && myUser.id && (
              <Link
                to="/dashboard"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isUserLogIn ? (
              <button
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={handleLogout}
                type="button"
              >
                Déconnexion <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Se connecter <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {myUser && myUser.id && (
                    <Link
                      to="/dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
                <div className="py-6">
                  {isUserLogIn ? (
                    <button
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={handleLogout}
                      type="button"
                    >
                      Déconnexion <span aria-hidden="true">&rarr;</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Se Connecter
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Une nouvelle façon d'apprendre par des quizz.
            </h1>
            <p className="mt-8 text-lg leading-8 text-gray-600">
              QuizZer, apprenez en jouant et testez vos connaissances de manière
              ludique.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <form
                className="flex items-center justify-center gap-x-6"
                onSubmit={handleJoinRoom}
              >
                <label htmlFor="room" className="sr-only">
                  Room
                </label>
                <input
                  type="text"
                  name="room"
                  id="room"
                  required
                  value={roomKey}
                  onChange={e => setRoomKey(e.target.value)}
                  className="px-3.5 py-2.5 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  placeholder="Entrer un code de session"
                />
                <div>
                  <button
                    type="submit"
                    className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:text-sm sm:leading-6"
                  >
                    Rejoindre un quizz
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-32rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
