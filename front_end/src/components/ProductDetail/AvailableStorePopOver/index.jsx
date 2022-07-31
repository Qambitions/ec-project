import { Popover } from "react-bootstrap";
const AvailableStorePopOver = () => (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Mặt hàng vẫn còn tại:</Popover.Header>
    <Popover.Body>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Body>
  </Popover>
);

export { AvailableStorePopOver };
