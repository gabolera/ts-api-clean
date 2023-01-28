import { AccountModel } from '../../models/AccountModel'

export interface AddAccoutUseCase {
  add(account: AddAccountProps): Promise<AccountModel>
}

export interface AddAccountProps {
  name: string
  email: string
  password: string
}
