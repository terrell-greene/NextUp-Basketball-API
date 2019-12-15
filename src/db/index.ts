import { UserModel } from './user.db'
import { CourtModel } from './court.db'
import { SessionModel } from './session.db'
import { SuggestedCourtModel } from './suggested-court.db'

export * from './user.db'
export * from './court.db'
export * from './session.db'
export * from './suggested-court.db'

export interface IDB {
  User: UserModel
  Court: CourtModel
  Session: SessionModel
  SuggestedCourt: SuggestedCourtModel
}
