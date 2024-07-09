export class ContactDTO {

    constructor(

        public id: number = 0,
        public name: string = '',
        public email: string = '',
        public phone: string = '',
        public createdAt: Date
    ) {

    }
}
