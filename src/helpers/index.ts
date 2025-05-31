import { en, faker, Faker, pl, pt_BR } from "@faker-js/faker"
import { Book } from "../types"

export const getLocale = (locale: string) => {
    switch (locale) {
        case "USA(English)":
            return en
        case "Brazil (Portuguese)":
            return pt_BR
        case "Poland (Polish)":
            return pl
        default:
            return en
    }
}

export const getLikesReviewsCount = (count: number): number => {
    const whole = Math.floor(count);
    const fractional = count - whole;
    return whole + (Math.random() < fractional ? 1 : 0);
}

export const generateReviewPerBook = () => {
    const owner = faker.person.fullName()
    const content = faker.lorem.sentences(3)
    const rating = faker.number.int({ min: 0, max: 5 })
    let date = faker.date.past().toISOString()
    date = `${date.split("T")[0]},  ${date.split("T")[1].split(".")[0]} `
    return { owner, content, rating, date }
}

export const generateFakeBook = (faker: Faker, likes: number, reviewCount: number): Book => {
    const id = faker.string.uuid()
    const title = faker.book.title()
    const authors = faker.book.author()
    const publisher = faker.book.publisher()
    const isbn = faker.commerce.isbn()
    const image = faker.image.urlPicsumPhotos()
    const reviews = Array.from({ length: getLikesReviewsCount(reviewCount) }, () => generateReviewPerBook())

    return { id, title, authors, publisher, isbn, image, likes: getLikesReviewsCount(likes), reviews }
}
