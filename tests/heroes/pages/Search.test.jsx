import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Search } from '../../../src/heroes/pages/Search';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Test on <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should be displayed correctly with default values', () => {

        const { container } = render(
            <MemoryRouter>
                <Search />
            </MemoryRouter>
        );

        // screen.debug();
        expect(container).toMatchSnapshot();
    });

    test('should show Batman and the input with the value of the queryString', () => {

        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Search />
            </MemoryRouter>
        );

        // screen.debug();

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');

        expect(container).toMatchSnapshot();
    });

    test('should show an error if the hero is not found', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Search />
            </MemoryRouter>
        );

        // screen.debug();

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('');
    });

    test('should call navigate to the new screen', () => {

        const { container } = render(
            <MemoryRouter initialEntries={['/search']}>
                <Search />
            </MemoryRouter>
        );

        // screen.debug();

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: 'batman' } });

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman');
    });

});