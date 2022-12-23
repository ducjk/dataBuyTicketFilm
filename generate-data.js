const faker = require('faker');
const fs = require('fs')

// set locale to use vietnamese
faker.locale = 'vi'

// random data

// console.log(faker.commerce.department());

const randomCategoryList = (n) => {
    const categoryList = []
    if (n <=0) return []
    let i = 1
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: i++,
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        categoryList.push(category)
    })

    return categoryList
}

const randomProductList = (CategoryList, numberOfProduct) => {
    const productList = []
    if (numberOfProduct <= 0) return []
    let id = 1
    for (const category of CategoryList) {
        Array.from(new Array(numberOfProduct)).forEach(() => {
            const product = {
                id: id++,
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                avatar: faker.image.avatar(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                categoryId: category.id,
                category: category.name,
            }
            productList.push(product)
        })
    }

    return productList
}

;(() => {
    // prepare db object
    const categoryList = randomCategoryList(4)
    const productList = randomProductList(categoryList, 4)
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: 'Duc'
        }
    }

    // write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate data successfully!');
    })

})();