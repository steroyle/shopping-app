import {Button, Group, NumberInput, NumberInputHandlers} from '@mantine/core';
import {useRef} from 'react';

function DecrementButton({handlersRef}: {handlersRef: React.RefObject<NumberInputHandlers>}) {
  return (
    <Button
      onClick={() => handlersRef.current?.decrement()}
      variant="primary"
      bg="gray.5"
      px="sm"
      fz="xl"
      style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
    >
      -
    </Button>
  );
}

function IncrementButton({handlersRef}: {handlersRef: React.RefObject<NumberInputHandlers>}) {
  return (
    <Button
      onClick={() => handlersRef.current?.increment()}
      variant="primary"
      bg="gray.5"
      px="sm"
      fz="xl"
      style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
    >
      +
    </Button>
  );
}

export default function QuantityInput() {
  const handlersRef = useRef<NumberInputHandlers>(null);

  return (
    <Group gap={0}>
      <DecrementButton handlersRef={handlersRef} />
      <NumberInput
        step={1}
        defaultValue={0}
        hideControls
        handlersRef={handlersRef}
        min={0}
        w={45}
        radius={0}
        styles={{
          input: {
            textAlign: 'center',
            borderLeft: 'none',
            borderRight: 'none',
            fontSize: 16,
            fontWeight: 600,
          },
        }}
      />
      <IncrementButton handlersRef={handlersRef} />
    </Group>
  );
}
