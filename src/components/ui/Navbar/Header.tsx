import { Menu, X } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import LogoSearchbar from './LogoSearchbar';
import { useForm } from '@tanstack/react-form';

const menuItems = [
  { name: 'Save more on App', href: '/' },
  { name: 'Sell on Daraz', href: '/' },
  { name: 'Help and Support ', href: '' },
  { name: 'زبان تبدیل کریں', href: '' },
];
export const Header = () => {
  const l = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className="bg-primary text-foreground z-50 max-w-full">
      <nav
        data-state={menuState && 'active'}
        className="sticky max-w-full px-2"
      >
        <div
          className={cn(
            'mx-auto  max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled && ' max-w-4xl rounded-2xl  backdrop-blur-lg lg:px-5',
          )}
        >
          <div className="relative flex flex-wrap items-center justify-end gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex  justify-end lg:w-auto">
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>
            <div className="hidden  lg:flex lg:justify-end lg:align-middle lg:items-center">
              <div className="flex gap-3 justify-end align-middle items-center text-sm">
                {menuItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      to={item.href}
                      className="text-foreground  hover:text-accent-foreground  duration-150"
                    >
                      <div className="text-foreground">{item.name}</div>
                    </Link>
                  </div>
                ))}
                <div className="flex gap-3 p-3 ">
                  <Login />
                  <SignUp />
                </div>
              </div>
            </div>
            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="flex justify-center align-middle items-center lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span className="font-bold">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                  <div className="flex gap-3 p-3 flex-col">
                    <Login />
                    <SignUp />
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <LogoSearchbar />
        </div>
      </nav>
    </header>
  );
};
