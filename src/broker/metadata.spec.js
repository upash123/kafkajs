const Broker = require('./index')
const { secureRandom, createConnection } = require('testHelpers')

describe('Broker > Metadata', () => {
  let topicName, broker

  beforeAll(async () => {
    topicName = `test-topic-${secureRandom()}`
    broker = new Broker(createConnection())
    await broker.connect()
  })

  afterAll(async () => {
    await broker.disconnect()
  })

  test('request', async () => {
    const response = await broker.metadata([topicName])
    expect(response).toEqual({
      brokers: [
        {
          host: expect.stringMatching(/\d+\.\d+\.\d+\.\d+/),
          nodeId: expect.any(Number),
          port: expect.any(Number),
          rack: null,
        },
        {
          host: expect.stringMatching(/\d+\.\d+\.\d+\.\d+/),
          nodeId: expect.any(Number),
          port: expect.any(Number),
          rack: null,
        },
        {
          host: expect.stringMatching(/\d+\.\d+\.\d+\.\d+/),
          nodeId: expect.any(Number),
          port: expect.any(Number),
          rack: null,
        },
      ],
      clusterId: expect.stringMatching(/[a-zA-Z0-9\-]/),
      controllerId: expect.any(Number),
      topicMetadata: [
        {
          isInternal: false,
          partitionMetadata: [
            {
              isr: expect.any(Array),
              leader: expect.any(Number),
              partitionErrorCode: 0,
              partitionId: 0,
              replicas: expect.any(Array),
            },
          ],
          topic: topicName,
          topicErrorCode: 0,
        },
      ],
    })
  })
})
