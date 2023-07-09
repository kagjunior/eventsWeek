import {Time} from "@angular/common";

export class Events {
  eventId?: number
  userId!: number
  titre!: string
  lieu!: string
  dateStart!: Date
  dateEnd!: Date
  hourStart!: Time
  hourEnd!: Time
  codePostal!: number
  ville!: string
  image?: string
  description!: string
  prix!: number
  place!: number
  statut!: number

}
