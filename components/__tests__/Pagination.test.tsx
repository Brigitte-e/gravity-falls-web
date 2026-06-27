import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../pagination/index";
import { t } from "@/lib/i18n";

const defaultProps = {
  page: 2,
  totalPages: 5,
  hasPrevious: true,
  hasNext: true,
  onPrevious: jest.fn(),
  onNext: jest.fn(),
  onPageChange: jest.fn(),
};

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays page number buttons", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
  });

  it("displays a compact page indicator", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(t("common.pageOfTotal", { page: 2, total: 5 }))).toBeInTheDocument();
  });

  it("marks the current page", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
  });

  it("calls onPrevious when Previous is clicked", async () => {
    render(<Pagination {...defaultProps} />);
    await userEvent.click(screen.getByRole("button", { name: t("common.previous") }));
    expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1);
  });

  it("calls onNext when Next is clicked", async () => {
    render(<Pagination {...defaultProps} />);
    await userEvent.click(screen.getByRole("button", { name: t("common.next") }));
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  it("calls onPageChange when a page number is clicked", async () => {
    render(<Pagination {...defaultProps} />);
    await userEvent.click(screen.getByRole("button", { name: "4" }));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables Previous button when hasPrevious is false", () => {
    render(<Pagination {...defaultProps} hasPrevious={false} />);
    expect(screen.getByRole("button", { name: t("common.previous") })).toBeDisabled();
  });

  it("renders nothing when there is only one page", () => {
    const { container } = render(
      <Pagination {...defaultProps} page={1} totalPages={1} hasPrevious={false} hasNext={false} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("disables Next button when hasNext is false", () => {
    render(<Pagination {...defaultProps} hasNext={false} />);
    expect(screen.getByRole("button", { name: t("common.next") })).toBeDisabled();
  });
});
