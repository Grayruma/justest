(function () {
  const form = document.getElementById('cost-calculator');
  if (!form) return;

  const errorNode = document.getElementById('calc-error');
  const resultNodes = {
    totalProduct: document.getElementById('r-total-product'),
    totalCost: document.getElementById('r-total-cost'),
    unitCost: document.getElementById('r-unit-cost'),
    margin: document.getElementById('r-margin'),
    marginRate: document.getElementById('r-margin-rate')
  };

  function parseNonNegative(value, fieldName) {
    const num = Number(value);
    if (!Number.isFinite(num) || num < 0) {
      throw new Error(`${fieldName} 값을 0 이상 숫자로 입력해 주세요.`);
    }
    return num;
  }

  function parseQuantity(value) {
    const num = Number(value);
    if (!Number.isInteger(num) || num < 1) {
      throw new Error('수량은 1 이상의 정수여야 합니다.');
    }
    return num;
  }

  function formatKRW(num) {
    return `${Math.round(num).toLocaleString('ko-KR')}원`;
  }

  function formatPercent(num) {
    return `${num.toFixed(2)}%`;
  }

  function setText(key, value) {
    if (resultNodes[key]) resultNodes[key].textContent = value;
  }

  function calculate(data) {
    const totalProduct = data.unitPrice * data.quantity;
    const taxableBase = totalProduct + data.chinaShipping + data.intlShipping;
    const duty = taxableBase * (data.dutyRate / 100);
    const vat = data.vatEnabled ? (taxableBase + duty) * 0.1 : 0;
    const totalCost = totalProduct + data.chinaShipping + data.intlShipping + duty + vat + data.otherFees;
    const unitCost = totalCost / data.quantity;

    let margin = null;
    let marginRate = null;

    if (data.expectedSalePrice !== null) {
      const expectedRevenue = data.expectedSalePrice * data.quantity;
      margin = expectedRevenue - totalCost;
      marginRate = expectedRevenue === 0 ? 0 : (margin / expectedRevenue) * 100;
    }

    return { totalProduct, totalCost, unitCost, margin, marginRate };
  }

  function readFormData(formEl) {
    const fd = new FormData(formEl);

    const data = {
      unitPrice: parseNonNegative(fd.get('unitPrice'), '상품 단가'),
      quantity: parseQuantity(fd.get('quantity')),
      chinaShipping: parseNonNegative(fd.get('chinaShipping'), '중국 내 배송비'),
      intlShipping: parseNonNegative(fd.get('intlShipping'), '국제배송비'),
      dutyRate: parseNonNegative(fd.get('dutyRate'), '관세율'),
      vatEnabled: fd.get('vatEnabled') === 'on',
      otherFees: parseNonNegative(fd.get('otherFees'), '기타 수수료'),
      expectedSalePrice: null
    };

    const salePriceRaw = fd.get('expectedSalePrice');
    if (salePriceRaw !== null && String(salePriceRaw).trim() !== '') {
      data.expectedSalePrice = parseNonNegative(salePriceRaw, '예상 판매가');
    }

    return data;
  }

  function renderResult(result) {
    setText('totalProduct', formatKRW(result.totalProduct));
    setText('totalCost', formatKRW(result.totalCost));
    setText('unitCost', formatKRW(result.unitCost));

    if (result.margin === null || result.marginRate === null) {
      setText('margin', '예상 판매가 입력 시 계산');
      setText('marginRate', '예상 판매가 입력 시 계산');
      return;
    }

    setText('margin', formatKRW(result.margin));
    setText('marginRate', formatPercent(result.marginRate));
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    errorNode.textContent = '';

    try {
      const data = readFormData(form);
      const result = calculate(data);
      renderResult(result);
    } catch (error) {
      errorNode.textContent = error.message || '입력값을 확인해 주세요.';
    }
  });

  form.addEventListener('reset', function () {
    setText('totalProduct', '-');
    setText('totalCost', '-');
    setText('unitCost', '-');
    setText('margin', '-');
    setText('marginRate', '-');
    errorNode.textContent = '';
  });
})();
