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

  function parseNonNegative(value, fieldLabel) {
    const num = Number(value);
    if (!Number.isFinite(num) || num < 0) {
      throw new Error(`${fieldLabel}은(는) 0 이상의 숫자로 입력해 주세요.`);
    }
    return num;
  }

  function parseQuantity(value) {
    const num = Number(value);
    if (!Number.isInteger(num) || num < 1) {
      throw new Error('수량은 1 이상의 정수만 입력할 수 있습니다.');
    }
    return num;
  }

  function formatKRW(value) {
    return `${Math.round(value).toLocaleString('ko-KR')}원`;
  }

  function formatPercent(value) {
    return `${value.toFixed(2)}%`;
  }

  function setResultText(key, value) {
    if (resultNodes[key]) resultNodes[key].textContent = value;
  }

  function readInput(formEl) {
    const fd = new FormData(formEl);

    const expectedSaleInput = fd.get('expectedSalePrice');
    const hasExpectedSalePrice = expectedSaleInput !== null && String(expectedSaleInput).trim() !== '';

    return {
      unitPrice: parseNonNegative(fd.get('unitPrice'), '상품 단가'),
      quantity: parseQuantity(fd.get('quantity')),
      chinaShipping: parseNonNegative(fd.get('chinaShipping'), '중국 내 배송비'),
      intlShipping: parseNonNegative(fd.get('intlShipping'), '국제배송비'),
      dutyRate: parseNonNegative(fd.get('dutyRate'), '관세율'),
      vatEnabled: fd.get('vatEnabled') === 'on',
      otherFees: parseNonNegative(fd.get('otherFees'), '기타 수수료'),
      expectedSalePrice: hasExpectedSalePrice
        ? parseNonNegative(expectedSaleInput, '예상 판매가')
        : null
    };
  }

  function calculate(input) {
    const totalProduct = input.unitPrice * input.quantity;
    const taxableBase = totalProduct + input.chinaShipping + input.intlShipping;
    const dutyAmount = taxableBase * (input.dutyRate / 100);
    const vatAmount = input.vatEnabled ? (taxableBase + dutyAmount) * 0.1 : 0;

    const totalCost = totalProduct + input.chinaShipping + input.intlShipping + dutyAmount + vatAmount + input.otherFees;
    const unitCost = totalCost / input.quantity;

    if (input.expectedSalePrice === null) {
      return {
        totalProduct,
        totalCost,
        unitCost,
        margin: null,
        marginRate: null
      };
    }

    const expectedRevenue = input.expectedSalePrice * input.quantity;
    const margin = expectedRevenue - totalCost;
    const marginRate = expectedRevenue === 0 ? 0 : (margin / expectedRevenue) * 100;

    return {
      totalProduct,
      totalCost,
      unitCost,
      margin,
      marginRate
    };
  }

  function render(result) {
    setResultText('totalProduct', formatKRW(result.totalProduct));
    setResultText('totalCost', formatKRW(result.totalCost));
    setResultText('unitCost', formatKRW(result.unitCost));

    if (result.margin === null || result.marginRate === null) {
      setResultText('margin', '예상 판매가 입력 시 계산');
      setResultText('marginRate', '예상 판매가 입력 시 계산');
      return;
    }

    setResultText('margin', formatKRW(result.margin));
    setResultText('marginRate', formatPercent(result.marginRate));
  }

  function resetResult() {
    setResultText('totalProduct', '-');
    setResultText('totalCost', '-');
    setResultText('unitCost', '-');
    setResultText('margin', '예상 판매가 입력 시 계산');
    setResultText('marginRate', '예상 판매가 입력 시 계산');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    errorNode.textContent = '';

    try {
      const input = readInput(form);
      const result = calculate(input);
      render(result);
    } catch (error) {
      errorNode.textContent = error.message || '입력값을 확인해 주세요.';
    }
  });

  form.addEventListener('reset', function () {
    errorNode.textContent = '';
    resetResult();
  });
})();
