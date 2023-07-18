export const PhoneVN = [
  '086',
  '096',
  '097',
  '098',
  '032',
  '033',
  '034',
  '035',
  '036',
  '037',
  '038',
  '039',
  '088',
  '091',
  '094',
  '083',
  '084',
  '085',
  '081',
  '082',
  '089',
  '090',
  '093',
  '070',
  '079',
  '077',
  '076',
  '078',
  '092',
  '056',
  '058',
  '099',
  '059',
  '095'
];

export const isPhoneVN = (phone: string): boolean => {
  return !!phone.match(/^\d{10}$/) && !!~PhoneVN.indexOf(phone.substr(0, 3))
}

export const isTelephone = (phone: string) => !!phone.match(/^0\d{9,10}$/g)