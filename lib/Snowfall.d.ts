import React from 'react';
import { SnowflakeConfig } from './Snowflake';
export interface SnowfallProps extends SnowflakeConfig {
    snowflakeCount?: number;
    style?: React.CSSProperties;
}
declare const Snowfall: ({ snowflakeCount, style, ...config }?: SnowfallProps) => JSX.Element;
export default Snowfall;
