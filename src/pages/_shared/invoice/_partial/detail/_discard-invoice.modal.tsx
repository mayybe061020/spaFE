import { Button, Modal, Text } from "@mantine/core";

type props = {
  opened: boolean;
  setOpened: (state: boolean) => void;
  loading?: boolean;
  onReject?: () => void;
};

const DiscardInvoiceModal = ({
  opened,
  setOpened,
  loading,
  onReject,
}: props) => {
  return (
    <Modal
      opened={opened}
      withCloseButton
      onClose={() => setOpened(false)}
      radius="md"
      title={
        <h1 className={"text-lg font-bold"}>
          Bạn có chắc sẽ hủy hóa đơn này chứ?
        </h1>
      }
    >
      <Text weight={"bold"} mb={32} color={"red"}>
        Hành động này không thể bị đảo ngược!
      </Text>

      <div className="flex justify-end space-x-4">
        <Button
          onClick={() => setOpened(false)}
          variant={"subtle"}
          color={"blue"}
        >
          Giữ Hóa Đơn
        </Button>
        <Button
          loading={loading}
          onClick={() => {
            onReject && onReject();
            setOpened(false);
          }}
          variant={"filled"}
          color={"red"}
        >
          Hủy Hóa Đơn
        </Button>
      </div>
    </Modal>
  );
};

export default DiscardInvoiceModal;
