import { selectThemeMode } from '@/app/model/app-slice.ts'
import { useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/features/auth/model/schemas.ts'
import { LoginInputs } from '@/features/auth/model/types.ts'

type _LoginInputs = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginInputs) => {
    console.log(data)
  }

  return (
    <Grid container justifyContent={'center'}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              helperText={errors.email?.message}
              error={!!errors.email}
              label="Email"
              margin="normal"
              {...register('email', {
                // required: { value: true, message: 'Email не должен быть пустым!' },
                // minLength: { value: 4, message: 'Длина email должна быть более 3 символов' },
                // pattern: {
                //   value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
                //   message: 'Невалидный email',
                // },
              })}
            />
            <TextField
              helperText={errors.password?.message}
              error={!!errors.password}
              type="password"
              label="Password"
              margin="normal"
              {...register('password', {
                // required: { value: true, message: 'Пароль не должен быть пустым!' },
                // minLength: { value: 4, message: 'Длина пароля должна быть более 3 символов' },
              })}
            />
            <Controller
              name="rememberMe"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  label="Remember me"
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                />
              )}
            />
            {/*<FormControlLabel*/}
            {/*  label="Remember me"*/}
            {/*  control={*/}
            {/*    <Controller*/}
            {/*      name="rememberMe"*/}
            {/*      control={control}*/}
            {/*      render={({ field }) => (*/}
            {/*        <Checkbox*/}
            {/*          onChange={(e) => {*/}
            {/*            field.onChange(e.currentTarget.checked)*/}
            {/*          }}*/}
            {/*          checked={field.value}*/}
            {/*        />*/}
            {/*      )}*/}
            {/*    />*/}
            {/*  }*/}
            {/*/>*/}

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
