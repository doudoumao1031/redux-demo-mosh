import { addBug, bugAdded } from '../bugs'
import { apiCallBegan } from '../api'
import configureAppStore from '../configureStore'

// solitary unit test
// describe('bugsSlice', () => {
//     describe('action creators', () => {
//         it('addBug', () => {
//             const bug = { description: 'a' }
//             const result = addBug(bug)
//             const expected = {
//                 type: apiCallBegan.type,
//                 payload: {
//                     url: '/bugs',
//                     method: 'post',
//                     data: bug,
//                     onSuccess: bugAdded.type,
//                 },
//             }
//             expect(result).toEqual(expected)
//         })
//     })
// })

// social unit test
describe('bugsSlice', () => {
    it('should handle the addBug action', async () => {
        const store = configureAppStore()
        const bug = { description: 'a' }
        await store.dispatch(addBug(bug))
        expect(store.getState().entities.bugs.list).toHaveLength(1)
    })
})