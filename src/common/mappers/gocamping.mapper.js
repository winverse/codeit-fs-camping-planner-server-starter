// 고캠핑 API 응답 항목 하나를 Campsite 테이블에 저장할 값으로 바꿉니다
export function toCampsiteData(item) {
  return {
    contentId: item.contentId,
    name: item.facltNm,
    intro: item.lineIntro,
    region: item.doNm,
    city: item.sigunguNm,
    address: item.addr1,
    industries: item.induty,
    facilities: item.sbrsCl,
    petAllowed: item.animalCmgCl.startsWith('가능'),
    imageUrl: item.firstImageUrl === '' ? null : item.firstImageUrl,
  };
}
