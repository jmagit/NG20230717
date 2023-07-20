import { from } from 'rxjs'

export * from './my-core.module'
export * from './services/logger.service'
export { CapitalizePipe, ElipsisPipe, StripTagsPipe, ErrorMessagePipe, } from './pipes/cadenas.pipe'
export { NIFValidator, UppercaseValidator } from './directives/mis-validadores.directive'
