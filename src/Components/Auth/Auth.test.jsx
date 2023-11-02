import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginContext } from '../../Context/Auth/context';
import Login from './Auth'; // Make sure to import the correct component path

// Create a mock context for testing
const mockContext = {
  loggedIn: true, // Simulate a logged-in user
  can: (capability) => true, // Simulate having all capabilities
};

// Mock the LoginContext provider to provide the mock context
const MockedLoginContextProvider = ({ children }) => (
  <LoginContext.Provider value={mockContext}>{children}</LoginContext.Provider>
);

describe('<Login />', () => {
  it('renders children when user is logged in and has the capability', () => {
    render(
      <MockedLoginContextProvider>
        <Login capability="some_capability">
          <div data-testid="child">Child Component</div>
        </Login>
      </MockedLoginContextProvider>
    );

    // Expect the child component to be rendered
    const childComponent = screen.getByTestId('child');
    expect(childComponent).toBeInTheDocument();
  });

  it('does not render children when user is not logged in', () => {
    const mockContextNotLoggedIn = { ...mockContext, loggedIn: false };

    render(
      <LoginContext.Provider value={mockContextNotLoggedIn}>
        <Login capability="some_capability">
          <div data-testid="child">Child Component</div>
        </Login>
      </LoginContext.Provider>
    );

    // Expect the child component NOT to be rendered
    const childComponent = screen.queryByTestId('child');
    expect(childComponent).toBeNull();
  });

  it('does not render children when user does not have the required capability', () => {
    const mockContextWithoutCapability = { ...mockContext, can: (capability) => false };

    render(
      <LoginContext.Provider value={mockContextWithoutCapability}>
        <Login capability="some_capability">
          <div data-testid="child">Child Component</div>
        </Login>
      </LoginContext.Provider>
    );

    // Expect the child component NOT to be rendered
    const childComponent = screen.queryByTestId('child');
    expect(childComponent).toBeNull();
  });
});
