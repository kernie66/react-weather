import {
  render,
  renderWithNotifications,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from '../../../testing-utils';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import { expect } from 'vitest';
import Header from '../Header.jsx';
import { locationHistoryData } from './data/locationHistoryData.js';
import { defaultAddress } from '../../atoms/locationStates.js';
import { fork } from 'radash';

const fakeLocationHistory = locationHistoryData;
const fakeLocationOption =
  fakeLocationHistory[fakeLocationHistory.length - 3].address;

describe('test Header and history selection', () => {
  beforeEach(() => {
    testQueryClient.removeQueries();
    localStorage.clear();
  });

  it('renders the header with buttons and empty history selector', async () => {
    const user = userEvent.setup();
    const snapshot = render(<Header />);

    const historyButton = await screen.findByRole('button', {
      name: /historik/i,
    });
    expect(historyButton).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /meny/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /öppna karta/i })
    ).toBeInTheDocument();
    expect(screen.getByText(defaultAddress)).toBeInTheDocument();
    expect(snapshot).toMatchSnapshot();

    // Click location text button
    await user.click(historyButton);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    const noHistoryOption = await screen.findByRole('option', {
      name: /ingen historik/i,
    });
    expect(noHistoryOption).toBeInTheDocument();

    // Click on no history option to close dialog
    await user.click(noHistoryOption);
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('dialog')
    );
    expect(screen.getByText(defaultAddress)).toBeInTheDocument();
  });

  it('renders the header and selects history location with mouse', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'locationHistory',
      JSON.stringify(fakeLocationHistory)
    );

    renderWithNotifications(<Header />);

    const historyButton = await screen.findByRole('button', {
      name: /historik/i,
    });
    expect(historyButton).toBeInTheDocument();
    expect(screen.getByText(defaultAddress)).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).toBeNull();

    // Click location name button
    await user.click(historyButton);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(
      fakeLocationHistory.length
    );

    // Select third option to update location and close dialog
    const thirdOption = await screen.findByRole('option', {
      name: fakeLocationOption,
    });
    expect(thirdOption).toBeInTheDocument();
    await user.click(thirdOption);
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('dialog')
    );

    // Expect location in both history button and in notification
    expect(screen.getAllByText(fakeLocationOption)).toHaveLength(2);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByText(/väderposition uppdaterad/i)
    ).toBeInTheDocument();

    // Close notification
    const closeNotification = screen.getByLabelText(/stäng notis/i);
    expect(closeNotification).toBeInTheDocument();
    await user.click(closeNotification);
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('alert')
    );

    // Click location name button again
    await user.click(historyButton);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Click outside to close dialog without updating location
    await user.click(document.body);
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('dialog')
    );
    expect(screen.getByText(fakeLocationOption)).toBeInTheDocument();
  });

  it('renders the header and selects history location with keyboard', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'locationHistory',
      JSON.stringify(fakeLocationHistory)
    );
    const searchTerm = 'bad';
    const [selected] = fork(fakeLocationHistory.toReversed(), (f) =>
      f.address.toLowerCase().includes(searchTerm)
    );

    render(<Header />);

    const historyButton = await screen.findByRole('button', {
      name: /historik/i,
    });
    expect(historyButton).toBeInTheDocument();
    expect(screen.getByText(defaultAddress)).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).toBeNull();

    // Click location name button
    await user.click(historyButton);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(
      fakeLocationHistory.length
    );

    // Enter some search text in the history input
    const historyInput1 = screen.getByRole('textbox', {
      name: /indatafält för historik/i,
    });
    expect(historyInput1).toBeInTheDocument();
    expect(historyInput1).toHaveFocus();
    await user.keyboard('bad');
    expect(historyInput1).toHaveValue('bad');
    const historyOptions = screen.getAllByRole('option');
    expect(historyOptions).toHaveLength(selected.length);
    expect(historyOptions[0]).toHaveTextContent(selected[0].address);
    expect(historyOptions[1]).toHaveTextContent(selected[1].address);

    // Select the default option
    await user.keyboard('{Enter}');
    expect(
      await screen.findByText(selected[0].address)
    ).toBeInTheDocument();
  });

  it('renders the header and selects history location with clear from keyboard', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'locationHistory',
      JSON.stringify(fakeLocationHistory)
    );
    const searchTerm = 'vik';
    const [selected] = fork(fakeLocationHistory.toReversed(), (f) =>
      f.address.toLowerCase().includes(searchTerm)
    );

    render(<Header />);

    const historyButton = await screen.findByRole('button', {
      name: /historik/i,
    });
    expect(historyButton).toBeInTheDocument();
    expect(screen.getByText(defaultAddress)).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).toBeNull();

    // Click location name button
    await user.click(historyButton);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(
      fakeLocationHistory.length
    );

    // Enter some search text in the history input
    const historyInput2 = screen.getByRole('textbox', {
      name: /indatafält för historik/i,
    });
    expect(historyInput2).toBeInTheDocument();
    expect(historyInput2).toHaveFocus();
    await user.keyboard('bad');
    expect(historyInput2).toHaveValue('bad');
    expect(screen.getAllByRole('option')).toHaveLength(2);

    // Clear the text with delete button
    const deleteButton = screen.getByRole('button', {
      name: /clear value/i,
    });
    expect(deleteButton).toBeVisible();
    await user.click(deleteButton);
    expect(historyInput2).toHaveValue('');
    expect(screen.getAllByRole('option')).toHaveLength(
      fakeLocationHistory.length
    );

    // Enter new search text
    expect(historyInput2).not.toHaveFocus();
    await user.click(historyInput2);
    expect(historyInput2).toHaveFocus();
    await user.keyboard(searchTerm);
    expect(historyInput2).toHaveValue(searchTerm);

    // Check the result of the search
    const historyOptions2 = screen.getAllByRole('option');
    expect(historyOptions2).toHaveLength(selected.length);
    expect(historyOptions2[0]).toHaveTextContent(selected[0].address);
    expect(historyOptions2[3]).toHaveTextContent(selected[3].address);

    // Select the third option using arrow keys
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(
      await screen.findByText(selected[2].address)
    ).toBeInTheDocument();
  });
});
