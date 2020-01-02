import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
jest.mock('./services/blogs')

afterEach(cleanup)

describe('<App />', () => {
  let component
  test('does not show any blogs without logging in', async () => {
    act(() => {
      component = render(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })
    await waitForElement(() => component.getByText('login'))
    expect(component.container).not.toHaveTextContent('Blogs')
  })
  test('shows a list of blogs for logged users', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    let savedItems = {}
    const localStorageMock = {
      setItem: (key, item) => {
        savedItems[key] = item
      },
      getItem: key => {
        return savedItems[key]
      },
      clear: () => {
        savedItems = {}
      }
    }
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    act(() => {
      component = render(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })
    await waitForElement(() => component.getByText('Blogs'))
    expect(component.container).toHaveTextContent('Blogs')
  })
})
