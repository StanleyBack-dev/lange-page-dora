/** The "*" after the label of a required field (the input carries
 * `required` / `aria-required` for assistive technology). Same as
 * frontend-dora's design system. */
export function RequiredMark() {
  return (
    <span aria-hidden className="ml-0.5 text-danger">
      *
    </span>
  );
}
