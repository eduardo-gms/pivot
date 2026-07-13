/**
 * Azure Application Insights integration for NestJS (Pino transport).
 *
 * Setup:
 * 1. Install the SDK:    npm install applicationinsights
 * 2. Set env var:        APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=...
 * 3. Import this module in main.ts BEFORE NestFactory.create()
 *
 * This file auto-starts Application Insights only when the connection string
 * is present, so it's safe to import in all environments.
 */

import * as appInsights from 'applicationinsights';

export function setupApplicationInsights(): void {
  const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

  if (!connectionString) {
    console.log('ℹ️  Application Insights: No connection string found, telemetry disabled.');
    return;
  }

  appInsights
    .setup(connectionString)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true)
    .setUseDiskRetryCaching(true)
    .start();

  console.log('✅ Application Insights: Telemetry enabled.');
}
