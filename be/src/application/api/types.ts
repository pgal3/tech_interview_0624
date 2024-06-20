import { Consumer } from "src/domain/types/consumer.type"

declare module "@fastify/request-context" {
  interface RequestContextData {
    consumer: Consumer
  }
}
