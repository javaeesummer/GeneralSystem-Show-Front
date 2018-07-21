import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('reviewSystem-Front')
const db = low(adapter)

db.defaults({
    username: [],
    activity: [],
}).write()

export default db
