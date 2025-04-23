const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { KnexInstrumentation } = require('@opentelemetry/instrumentation-knex');

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
    serviceName: 'nepchatbot-api',
    traceExporter: new OTLPTraceExporter({
        url: 'http://otel-collector:4317',
        compression: 'gzip'
    }),
    instrumentations: [
        new HttpInstrumentation(),
        new KnexInstrumentation()
    ]
});

process.on('beforeExit', async () => {
    await sdk.shutdown();
});

module.exports.initializeTracing = async () => {
    return sdk.start();
};