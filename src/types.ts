/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeType = 'pulse' | 'heritage' | 'minimal';

export interface AgeGenderBoth {
  male: number;
  female: number;
  both: number;
}

export interface WilayaData {
  name: string;
  total: AgeGenderBoth;
  omani: AgeGenderBoth;
  nonOmani: AgeGenderBoth;
}

export interface HealthTargetGroup {
  id: string;
  titleAr: string;
  titleEn: string;
  range: string;
  icon: string;
  count: number;
  percentage: number;
  note: string;
}
