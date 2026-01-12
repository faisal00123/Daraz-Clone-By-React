import { Link, Navigate, useNavigate } from '@tanstack/react-router';
import { Button } from '../button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';
import { Input } from '../input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';
import { useForm } from '@tanstack/react-form';
import {
  SignUpValidation,
  type SignUpValidationType,
} from '@/lib/Schemas/Login';
import Login from './Login';
import { toast } from 'sonner';

const SignUp = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    } as SignUpValidationType,
    onSubmit: ({ value }) => {
      let user = localStorage.setItem('user', JSON.stringify(value));
      toast.success('User SignUp Successfully');
      navigate({
        to: '/',
        replace: true,
      });
    },
    validators: {
      onChange: SignUpValidation,
    },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <span className="text-foreground ">Sign Up</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="Account">Sign up</TabsTrigger>
            </TabsList>
            <DialogHeader className="text-center">
              <DialogTitle className="flex justify-center align-middle items-center m-3 font-bold ">
                Create An Account
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                (e.preventDefault(), form.handleSubmit());
              }}
            >
              <TabsContent value="Account" className="mt-6">
                <div className="grid  gap-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <form.Field name="firstName">
                      {(field) => (
                        <>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter first name"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {field.state.meta.errors.map((e) => (
                            <span key={e?.message} className="text-destructive">
                              {e?.message}
                            </span>
                          ))}
                        </>
                      )}
                    </form.Field>
                    <form.Field name="lastName">
                      {(field) => (
                        <>
                          <Input
                            id="lastName"
                            type="text"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter first name"
                          />
                          {field.state.meta.errors.map((e) => (
                            <span key={e?.message} className="text-destructive">
                              {e?.message}
                            </span>
                          ))}
                        </>
                      )}
                    </form.Field>
                  </div>
                  <div className="grid gap-3">
                    <form.Field name="email">
                      {(field) => (
                        <>
                          <Input
                            id="email"
                            type="email"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter your Email"
                          />
                          {field.state.meta.errors.map((e) => (
                            <span key={e?.message} className="text-destructive">
                              {e?.message}
                            </span>
                          ))}
                        </>
                      )}
                    </form.Field>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <form.Field name="password">
                      {(field) => (
                        <>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {field.state.meta.errors.map((e) => (
                            <span key={e?.message} className="text-destructive">
                              {e?.message}
                            </span>
                          ))}
                        </>
                      )}
                    </form.Field>
                    <form.Field name="confirmPassword">
                      {(field) => (
                        <>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Confirm Password"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {field.state.meta.errors.map((e) => (
                            <span key={e?.message} className="text-destructive">
                              {e?.message}
                            </span>
                          ))}
                        </>
                      )}
                    </form.Field>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => {}}>
                    Sign Up
                  </Button>
                </DialogFooter>
              </TabsContent>
            </form>
          </Tabs>
          <DialogDescription className="flex gap-2 justify-center align-middle items-center">
            Already have an account?
            <Link to="/">
              {' '}
              <Login />
            </Link>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUp;
