/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgeGenderBoth, WilayaData, HealthTargetGroup } from './types';

export const WILAYAS_AR = ['صلالة', 'طاقة', 'مرباط', 'رخيوت', 'ثمريت', 'ظلكوت', 'المزيونة', 'مقشن', 'شليم وجزر الحلانيات', 'سدح'];
export const WILAYAS_EN = ['Salalah', 'Taqah', 'Mirbat', 'Rakhyut', 'Thumrayt', 'Dalkut', 'Al Mazuynah', 'Muqshin', 'Shalim wa juzur al Hallniyat', 'Sadh'];

export const AGE_GROUPS = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'];

// T24 & T25 totals: [male, female, both] index 0 is ALL, then indices 1..17 are age groups
export const TOTALS_24: AgeGenderBoth[] = [
  { male: 347843, female: 181782, both: 529625 }, // ALL
  { male: 20087, female: 19333, both: 39420 },   // 0-4
  { male: 21730, female: 21095, both: 42825 },   // 5-9
  { male: 18568, female: 17574, both: 36142 },   // 10-14
  { male: 13883, female: 12993, both: 26876 },   // 15-19
  { male: 26748, female: 13040, both: 39788 },   // 20-24
  { male: 40596, female: 15344, both: 55940 },   // 25-29
  { male: 46884, female: 17000, both: 63884 },   // 30-34
  { male: 53231, female: 18096, both: 71327 },   // 35-39
  { male: 41362, female: 15114, both: 56476 },   // 40-44
  { male: 25820, female: 10824, both: 36644 },   // 45-49
  { male: 15632, female: 6053, both: 21685 },    // 50-54
  { male: 9796, female: 4462, both: 14258 },     // 55-59
  { male: 5990, female: 3735, both: 9725 },      // 60-64
  { male: 3981, female: 3000, both: 6981 },      // 65-69
  { male: 1603, female: 1669, both: 3272 },      // 70-74
  { male: 959, female: 1110, both: 2069 },      // 75-79
  { male: 973, female: 1340, both: 2313 }        // 80+
];

export const TOTALS_25: AgeGenderBoth[] = [
  { male: 343110, female: 189787, both: 532897 }, // ALL
  { male: 20044, female: 19439, both: 39483 },
  { male: 22106, female: 21294, both: 43400 },
  { male: 19606, female: 18530, both: 38136 },
  { male: 14998, female: 13985, both: 28983 },
  { male: 20997, female: 13932, both: 34929 },
  { male: 40231, female: 16168, both: 56399 },
  { male: 43097, female: 17259, both: 60356 },
  { male: 50539, female: 18606, both: 69145 },
  { male: 42856, female: 16109, both: 58965 },
  { male: 27754, female: 11875, both: 39629 },
  { male: 16353, female: 6730, both: 23083 },
  { male: 10444, female: 4617, both: 15061 },
  { male: 6042, female: 3746, both: 9788 },
  { male: 4207, female: 3216, both: 7423 },
  { male: 1856, female: 1763, both: 3619 },
  { male: 979, female: 1168, both: 2147 },
  { male: 1001, female: 1350, both: 2351 }
];

// Omani 2024 & 2025: indices 0..17
export const OMANI_24: AgeGenderBoth[] = [
  { male: 120745, female: 118098, both: 238843 }, // ALL
  { male: 15274, female: 14687, both: 29961 },   // 0-4
  { male: 16555, female: 16177, both: 32732 },
  { male: 13775, female: 13212, both: 26987 },
  { male: 10024, female: 9538, both: 19562 },
  { male: 8690, female: 8255, both: 16945 },
  { male: 8572, female: 8364, both: 16936 },
  { male: 9367, female: 9230, both: 18597 },
  { male: 9630, female: 9324, both: 18954 },
  { male: 8452, female: 8465, both: 16917 },
  { male: 6330, female: 6194, both: 12524 },
  { male: 3834, female: 3331, both: 7165 },
  { male: 2807, female: 2833, both: 5640 },
  { male: 2615, female: 2719, both: 5334 },
  { male: 2216, female: 2339, both: 4555 },
  { male: 1065, female: 1307, both: 2372 },
  { male: 713, female: 904, both: 1617 },
  { male: 826, female: 1219, both: 2045 }
];

export const OMANI_25: AgeGenderBoth[] = [
  { male: 123542, female: 120782, both: 244324 }, // ALL
  { male: 14862, female: 14400, both: 29262 },
  { male: 16633, female: 16085, both: 32718 },
  { male: 14553, female: 13977, both: 28530 },
  { male: 10730, female: 10189, both: 20919 },
  { male: 8734, female: 8402, both: 17136 },
  { male: 8670, female: 8321, both: 16991 },
  { male: 9166, female: 9025, both: 18191 },
  { male: 9631, female: 9447, both: 19078 },
  { male: 8832, female: 8754, both: 17586 },
  { male: 6895, female: 6811, both: 13706 },
  { male: 4188, female: 3766, both: 7954 },
  { male: 2919, female: 2786, both: 5705 },
  { male: 2574, female: 2679, both: 5253 },
  { male: 2374, female: 2576, both: 4950 },
  { male: 1210, female: 1398, both: 2608 },
  { male: 745, female: 947, both: 1692 },
  { male: 826, female: 1219, both: 2045 }
];

// Non-Omani 2024 & 2025: indices 0..17
export const NON_OMANI_24: AgeGenderBoth[] = [
  { male: 227098, female: 63684, both: 290782 }, // ALL
  { male: 4813, female: 4646, both: 9459 },     // 0-4
  { male: 5175, female: 4918, both: 10093 },
  { male: 4793, female: 4362, both: 9155 },
  { male: 3859, female: 3455, both: 7314 },
  { male: 18058, female: 4785, both: 22843 },
  { male: 32024, female: 6980, both: 39004 },
  { male: 37517, female: 7770, both: 45287 },
  { male: 43601, female: 8772, both: 52373 },
  { male: 32910, female: 6649, both: 39559 },
  { male: 19490, female: 4630, both: 24120 },
  { male: 11798, female: 2722, both: 14520 },
  { male: 6989, female: 1629, both: 8618 },
  { male: 3375, female: 1016, both: 4391 },
  { male: 1765, female: 661, both: 2426 },
  { male: 538, female: 362, both: 900 },
  { male: 246, female: 206, both: 452 },
  { male: 147, female: 121, both: 268 }
];

export const NON_OMANI_25: AgeGenderBoth[] = [
  { male: 219568, female: 69005, both: 288573 }, // ALL
  { male: 5182, female: 5039, both: 10221 },
  { male: 5473, female: 5209, both: 10682 },
  { male: 5053, female: 4553, both: 9606 },
  { male: 4268, female: 3796, both: 8064 },
  { male: 12263, female: 5530, both: 17793 },
  { male: 31561, female: 7847, both: 39408 },
  { male: 33931, female: 8234, both: 42165 },
  { male: 40908, female: 9159, both: 50067 },
  { male: 34024, female: 7355, both: 41379 },
  { male: 20859, female: 5064, both: 25923 },
  { male: 12165, female: 2964, both: 15129 },
  { male: 7525, female: 1831, both: 9356 },
  { male: 3468, female: 1067, both: 4535 },
  { male: 1833, female: 640, both: 2473 },
  { male: 646, female: 365, both: 1011 },
  { male: 234, female: 221, both: 455 },
  { male: 175, female: 131, both: 306 }
];

// Wilayat Totals for 2024 [male, female, both] sorted by W order.
export const WILAYAS_DATA_24: WilayaData[] = [
  {
    name: 'صلالة',
    total: { male: 290241, female: 140163, both: 430404 },
    omani: { male: 83635, female: 81809, both: 165444 },
    nonOmani: { male: 206606, female: 58354, both: 264960 }
  },
  {
    name: 'طاقة',
    total: { male: 13886, female: 11281, both: 25167 },
    omani: { male: 10366, female: 10256, both: 20622 },
    nonOmani: { male: 3520, female: 1025, both: 4545 }
  },
  {
    name: 'مرباط',
    total: { male: 10907, female: 8089, both: 18996 },
    omani: { male: 7412, female: 7211, both: 14623 },
    nonOmani: { male: 3495, female: 878, both: 4373 }
  },
  {
    name: 'رخيوت',
    total: { male: 2773, female: 2466, both: 5239 },
    omani: { male: 2356, female: 2318, both: 4674 },
    nonOmani: { male: 417, female: 148, both: 565 }
  },
  {
    name: 'ثمريت',
    total: { male: 12348, female: 6998, both: 19346 },
    omani: { male: 5481, female: 5352, both: 10833 },
    nonOmani: { male: 6867, female: 1646, both: 8513 }
  },
  {
    name: 'ظلكوت',
    total: { male: 1760, female: 1696, both: 3456 },
    omani: { male: 1525, female: 1554, both: 3079 },
    nonOmani: { male: 235, female: 142, both: 377 }
  },
  {
    name: 'المزيونة',
    total: { male: 6010, female: 5105, both: 11115 },
    omani: { male: 4576, female: 4397, both: 8973 },
    nonOmani: { male: 1434, female: 708, both: 2142 }
  },
  {
    name: 'مقشن',
    total: { male: 464, female: 412, both: 876 },
    omani: { male: 301, female: 354, both: 655 },
    nonOmani: { male: 163, female: 58, both: 221 }
  },
  {
    name: 'شليم وجزر الحلانيات',
    total: { male: 6087, female: 2653, both: 8740 },
    omani: { male: 2269, female: 2149, both: 4418 },
    nonOmani: { male: 3818, female: 504, both: 4322 }
  },
  {
    name: 'سدح',
    total: { male: 3367, female: 2919, both: 6286 },
    omani: { male: 2824, female: 2698, both: 5522 },
    nonOmani: { male: 543, female: 221, both: 764 }
  }
];

export const WILAYAS_DATA_25: WilayaData[] = [
  {
    name: 'صلالة',
    total: { male: 283539, female: 146755, both: 430294 },
    omani: { male: 85508, female: 83585, both: 169093 },
    nonOmani: { male: 198031, female: 63170, both: 261201 }
  },
  {
    name: 'طاقة',
    total: { male: 14258, female: 11583, both: 25841 },
    omani: { male: 10622, female: 10471, both: 21093 },
    nonOmani: { male: 3636, female: 1112, both: 4748 }
  },
  {
    name: 'مرباط',
    total: { male: 10930, female: 8167, both: 19097 },
    omani: { male: 7443, female: 7217, both: 14660 },
    nonOmani: { male: 3487, female: 950, both: 4437 }
  },
  {
    name: 'رخيوت',
    total: { male: 2883, female: 2515, both: 5398 },
    omani: { male: 2391, female: 2354, both: 4745 },
    nonOmani: { male: 492, female: 161, both: 653 }
  },
  {
    name: 'ثمريت',
    total: { male: 12558, female: 7335, both: 19893 },
    omani: { male: 5663, female: 5542, both: 11205 },
    nonOmani: { male: 6895, female: 1793, both: 8688 }
  },
  {
    name: 'ظلكوت',
    total: { male: 1829, female: 1676, both: 3505 },
    omani: { male: 1507, female: 1529, both: 3036 },
    nonOmani: { male: 322, female: 147, both: 469 }
  },
  {
    name: 'المزيونة',
    total: { male: 6339, female: 5544, both: 11883 },
    omani: { male: 4898, female: 4755, both: 9653 },
    nonOmani: { male: 1441, female: 789, both: 2230 }
  },
  {
    name: 'مقشن',
    total: { male: 454, female: 398, both: 852 },
    omani: { male: 297, female: 338, both: 635 },
    nonOmani: { male: 157, female: 60, both: 217 }
  },
  {
    name: 'شليم وجزر الحلانيات',
    total: { male: 6899, female: 2822, both: 9721 },
    omani: { male: 2345, female: 2244, both: 4589 },
    nonOmani: { male: 4554, female: 578, both: 5132 }
  },
  {
    name: 'سدح',
    total: { male: 3421, female: 2992, both: 6413 },
    omani: { male: 2868, female: 2747, both: 5615 },
    nonOmani: { male: 553, female: 245, both: 798 }
  }
];

// Health Planning Target Groups (based on 2024 total data)
// Let's copy from the original:
// Infants (<1 year) ~7884 which is 1.5% of total (estimated)
// Children Under 5: 39420 (7.4%)
// Students / Youth (5-14): 78967 (14.9%)
// Women of reproductive age (15-49 females): 102411 (19.3%)
// Older Adults (60-74): 19978 (3.8%)
// Seniors (75+): 4382 (0.8%)
export const HEALTH_GROUPS_24: HealthTargetGroup[] = [
  {
    id: 'infants',
    titleAr: 'الرضع (Infants)',
    titleEn: 'Under 1 Year',
    range: 'أقل من سنة | Under 1 year',
    icon: '👶',
    count: 7884,
    percentage: 1.5,
    note: '~1.5% من الإجمالي (تقديري)'
  },
  {
    id: 'under5',
    titleAr: 'الأطفال دون سن 5',
    titleEn: 'Children Under 5',
    range: '0-4 سنوات',
    icon: '🧒',
    count: 39420,
    percentage: 7.4,
    note: '7.4% من الإجمالي'
  },
  {
    id: 'students',
    titleAr: 'اليافعون وطلاب المدارس',
    titleEn: 'School Youth',
    range: '5-14 سنة',
    icon: '📚',
    count: 78967,
    percentage: 14.9,
    note: '14.9% من الإجمالي'
  },
  {
    id: 'reproductive',
    titleAr: 'النساء في سن الإنجاب',
    titleEn: 'Women of Reproductive Age',
    range: '15-49 سنة (إناث)',
    icon: '👩',
    count: 102411,
    percentage: 19.3,
    note: '19.3% من الإجمالي'
  },
  {
    id: 'older',
    titleAr: 'كبار السن',
    titleEn: 'Older Adults',
    range: '60-74 سنة',
    icon: '👴',
    count: 19978,
    percentage: 3.8,
    note: '3.8% من الإجمالي'
  },
  {
    id: 'seniors',
    titleAr: 'المسنون',
    titleEn: 'Seniors',
    range: '75+ سنة',
    icon: '🧓',
    count: 4382,
    percentage: 0.8,
    note: '0.8% من الإجمالي'
  }
];
