import { AwilixRegistrable } from "@libs/common/interfaces/awilix-registrable.interface";

export const filePort = Symbol.for("filePort")
export interface FilePort extends AwilixRegistrable {
}
