import { Button, Flex, Text } from "@radix-ui/themes";
import { FieldArray, useFormikContext } from "formik";

import { TextInput } from "@app/components";

import { FormValuesType } from "../../config";

export const AdditionalNotesFields = () => {
  const {
    values: { notes },
  } = useFormikContext<FormValuesType>();

  const maxNotes = 3;

  return (
    <>
      <FieldArray
        name="notes"
        render={({ remove, insert }) => {
          const renderItems = () => {
            if (!notes.length) return <Text>No additional notes</Text>;

            return notes.map((_, index) => {
              return (
                <Flex
                  key={`additional-notes-${index}`}
                  direction="row"
                  align="start"
                  gap="2"
                  className="flex-1"
                >
                  <div className="w-full">
                    <TextInput
                      name={`notes[${index}]`}
                      placeholder="Add your additional note here"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    color="red"
                    className="mt-1"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </Flex>
              );
            });
          };

          return (
            <div className="pr-4">
              <Flex align="start" gap="4">
                <Text weight="medium" size="6" mb="4">
                  Additional Notes
                </Text>
                {notes.length <= maxNotes - 1 && (
                  <Button
                    type="button"
                    variant="soft"
                    onClick={() => insert(notes.length, "")}
                  >
                    Add a note
                  </Button>
                )}
              </Flex>
              {renderItems()}
            </div>
          );
        }}
      />
    </>
  );
};
