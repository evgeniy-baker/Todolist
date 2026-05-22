import { instance } from '@/common/instance'

export const authApi = {
  login() {
    return instance.get(`/auth/login`)
  },
}
