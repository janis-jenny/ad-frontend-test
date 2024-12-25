import '@testing-library/jest-dom'
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => <img {...props} src={props.src?.toString()} priority={props.priority?.toString()} fill={props.fill?.toString()}/>
  }))