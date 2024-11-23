export const openHistory = async ({
  user,
  screen,
  numberOfOptions,
}) => {
  // Click the History button
  await user.click(
    await screen.findByRole('button', {
      name: /historik/i,
    })
  );
  expect(
    await screen.findByPlaceholderText(/välj plats från historiken/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('listbox', {
      name: /indatafält för historik/i,
      hidden: true,
    })
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole('option', { hidden: true })
  ).toHaveLength(numberOfOptions);
};

export const selectLocation = async (user, screen) => {
  // Select address
  const selectButton = await screen.findByRole('button', {
    name: /välj/i,
    hidden: true,
  });
  expect(selectButton).toBeInTheDocument();
  await user.click(selectButton);
};

export const selectOption = async ({ user, screen, option }) => {
  // Select option from history
  const selectedOption = await screen.findByRole('option', {
    name: option,
    hidden: true,
  });
  expect(selectedOption).toBeInTheDocument();
  await user.click(selectedOption);
  expect(await screen.findByRole('option', { hidden: true })).toBe(
    selectedOption
  );
};

export const deleteInput = async (user, screen) => {
  // Clear the input with delete button
  const deleteButton = screen.getByRole('button', {
    name: /radera inmatning/i,
    hidden: true,
  });
  expect(deleteButton).toBeVisible();
  await user.click(deleteButton);
};

export const closeMap = async (user, screen) => {
  // Check that the Close button is available and click on it
  const closeButton = screen.getByRole('button', {
    name: /stäng karta/i,
  });
  expect(closeButton).toBeInTheDocument();
  await user.click(closeButton);
};
