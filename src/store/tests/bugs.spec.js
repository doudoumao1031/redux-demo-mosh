import { addBug, bugAdded, getUnresolvedBugs } from '../bugs'
import { apiCallBegan } from '../api'
import configureAppStore from '../configureStore'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

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

    let fakeAxios
    let store

    beforeEach(()=>{
        fakeAxios = new MockAdapter(axios)
        store = configureAppStore()
    })

    afterEach(() => {
        fakeAxios.reset();
    });

    const bugsSlice = () => store.getState().entities.bugs

    // every test should start with a clean state
    const createState = () => ({
        entities: {
            bugs: {
                list: []
            }
        }
    })

    it('should add the bug to the store if it\'s saved to the server', async () => {
        // Arrange
        const bug = {description: 'a'}
        const response = {id: 1, ...bug}
        fakeAxios.onPost('/bugs').reply(200, response)

        // Act
        await store.dispatch(addBug(bug))

        // Assert
        // expect(store.getState().entities.bugs.list).toHaveLength(1)
        expect(bugsSlice().list).toContainEqual(response)
    })

    it('should not add the bug to the store if it\'s not saved to the server', async () => {
        // Arrange
        const bug = {description: 'a'}
        fakeAxios.onPost('/bugs').reply(500)

        // Act
        await store.dispatch(addBug(bug))

        // Assert
        expect(bugsSlice().list).toHaveLength(0)
    })

    it('should mark the bug as resolved if it\'s saved to the server', async () => {
        // Arrange
        fakeAxios.onPatch('/bugs/1').reply(200, {id: 1, resolved: true})
        fakeAxios.onPost('/bugs').reply(200, {id: 1})

        // Act
        await store.dispatch(addBug({}))
        await store.dispatch(resolveBug(1))

        // Assert
        expect(bugsSlice().list[0].resolved).toBe(true)
    })

    describe('selectors', ()=>{
        it('getUnresolvedBugs', () => {
            // Arrange
            // every test should start with a clean state
            const state = createState() 
            state.entities.bugs.list = [
                {id: 1, resolved: true},
                {id: 2},
                {id: 3}
            ]
            // Act
            const result = getUnresolvedBugs(state)
            // Assert
            expect(result).toHaveLength(2)
        })
    })
})