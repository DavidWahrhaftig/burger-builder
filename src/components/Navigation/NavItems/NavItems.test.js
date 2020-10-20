import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';
// connect enzyme
configure({adapter: new Adapter()});

describe('<NavItems/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    });

    // tests
    it('should render two <NavItem/> if not authenticated', () => {
        // test logic
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render three <NavItem/> if authenticated', () => {
        // test logic
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should contain a logout <NavItem/> when authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true);
    });
})