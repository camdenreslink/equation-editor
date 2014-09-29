var generateLatex = function(expr) {
	var latexString = '';
	for (var i = 0; i < expr.length; i++) {
		var wrapper = expr[i];
		switch (wrapper.type) {
			case "Symbol":
				latexString += symbolToLatex(wrapper);
				break;
			case "BigOperator":
				latexString += bigOperatorToLatex(wrapper);
				break;
			case "Function":
				latexString += functionToLatex(wrapper);
				break;
			case "Bracket":
				latexString += bracketToLatex(wrapper);
				break;
			case "Operator":
				latexString += operatorToLatex(wrapper);
				break;
			case "BracketPair":
				latexString += bracketPairToLatex(wrapper);
				break;
			case "Integral":
				latexString += integralToLatex(wrapper);
				break;
			case "Accent":
				latexString += accentToLatex(wrapper);
				break;
			case "FunctionLower":
				latexString += functionLowerToLatex(wrapper);
				break;
			case "Limit":
				latexString += limitToLatex(wrapper);
				break;
			case "LogLower":
				latexString += logLowerToLatex(wrapper);
				break;
			case "Matrix":
				latexString += matrixToLatex(wrapper);
				break;
			case "NthRoot":
				latexString += nthRootToLatex(wrapper);
				break;
			case "SquareRoot":
				latexString += squareRootToLatex(wrapper);
				break;
			case "StackedFraction":
				latexString += stackedFractionToLatex(wrapper);
				break;
			case "Superscript":
				latexString += superscriptToLatex(wrapper);
				var endBraces = '';
				while (typeof expr[i + 1] !== "undefined" && expr[i + 1].type === "Superscript") {
					i++;
					latexString = latexString.substring(0, latexString.length - 1);
					endBraces += '}';
					latexString += superscriptToLatex(expr[i]);
				}
				latexString += endBraces;
				break;
			case "Subscript":
				latexString += subscriptToLatex(wrapper);
				var endBraces = '';
				while (typeof expr[i + 1] !== "undefined" && expr[i + 1].type === "Subscript") {
					i++;
					latexString = latexString.substring(0, latexString.length - 1);
					endBraces += '}';
					latexString += subscriptToLatex(expr[i]);
				}
				latexString += endBraces;
				break;
			case "SuperscriptAndSubscript":
				var superscripts = [];
				var subscripts = [];
				superscripts.push(wrapper.operands.superscript);
				subscripts.push(wrapper.operands.subscript);
				while (typeof expr[i + 1] !== "undefined" && expr[i + 1].type === "SuperscriptAndSubscript") {
					i++;
					superscripts.push(expr[i].operands.superscript);
					subscripts.push(expr[i].operands.subscript);
				}
				while (typeof expr[i + 1] !== "undefined" && expr[i + 1].type === "Superscript") {
					i++;
					superscripts.push(expr[i].operands.superscript);
				}
				while (typeof expr[i + 1] !== "undefined" && expr[i + 1].type === "Subscript") {
					i++;
					subscripts.push(expr[i].operands.subscript);
				}
				var supString = '';
				var supEndBraces = '';
				for (var j = 0; j < superscripts.length; j++) {
					supString += '^{' + generateLatex(superscripts[j]);
					supEndBraces += '}';
				}
				supString += supEndBraces;
				var subString = '';
				var subEndBraces = '';
				for (var j = 0; j < subscripts.length; j++) {
					subString += '_{' + generateLatex(subscripts[j]);
					subEndBraces += '}';
				}
				subString += subEndBraces;
				latexString += supString + subString;
				break;
		}
	}
	return latexString;
}

var symbolToLatex = function(expr) {
	var latexString = '';
	var symbolToLatexMapping = {
		'∂': '\\partial',
		'∞': '\\infty',
		'Γ': '\\Gamma',
		'Δ': '\\Delta',
		'Θ': '\\Theta',
		'Λ': '\\Lambda',
		'Ξ': '\\Xi',
		'Π': '\\Pi',
		'Σ': '\\Sigma',
		'Υ': '\\Upsilon',
		'Φ': '\\Phi',
		'Ψ': '\\Psi',
		'Ω': '\\Omega',
		'α': '\\alpha',
		'β': '\\beta',
		'γ': '\\gamma',
		'δ': '\\delta',
		'ε': '\\varepsilon',
		'ϵ': '\\epsilon',
		'ζ': '\\zeta',
		'η': '\\eta',
		'θ': '\\theta',
		'ϑ': '\\vartheta',
		'ι': '\\iota',
		'κ': '\\kappa',
		'λ': '\\lambda',
		'μ': '\\mu',
		'ν': '\\nu',
		'ξ': '\\xi',
		'π': '\\pi',
		'ϖ': '\\varpi',
		'ρ': '\\rho',
		'ϱ': '\\varrho',
		'σ': '\\sigma',
		'ς': '\\varsigma',
		'τ': '\\tau',
		'υ': '\\upsilon',
		'φ': '\\varphi',
		'ϕ': '\\phi',
		'χ': '\\chi',
		'ψ': '\\psi',
		'ω': '\\omega',
		'ı': '\\imath',
		'ȷ': '\\jmath'
	}
	if (typeof symbolToLatexMapping[expr.value] === 'undefined') {
		latexString = expr.value;
	} else {
		latexString = symbolToLatexMapping[expr.value];
	}
	return latexString;
}

var bigOperatorToLatex = function(expr) {
	var latexString = '';
	var lowerLimitString = '';
	var upperLimitString = '';
	var operandString = '';
	if (typeof expr.operands.lowerLimit !== "undefined") {
		lowerLimitString = '_{' + generateLatex(expr.operands.lowerLimit) + '}';
	}
	if (typeof expr.operands.upperLimit !== "undefined") {
		upperLimitString = '^{' + generateLatex(expr.operands.upperLimit) + '}';
	}
	operandString = generateLatex(expr.operands.operand);
	var bigOperatorToLatexMapping = {
        sum: '\\sum',
        bigCap: '\\bigcap',
        bigCup: '\\bigcup',
        bigSqCap: '\\sqcap',
        bigSqCup: '\\bigsqcup',
        prod: '\\prod',
        coProd: '\\coprod',
        bigVee: '\\bigvee',
        bigWedge: '\\bigwedge'
	}
	latexString = bigOperatorToLatexMapping[expr.value] + lowerLimitString + upperLimitString + operandString;
	return latexString;
}

var functionToLatex = function(expr) {
	var latexString = '';
	latexString = '\\' + expr.value;
	return latexString;
}

var bracketToLatex = function(expr) {
	var latexString = '';
	var bracketToLatexMapping = {
        leftParenthesisBracket: '\\left(',
        rightParenthesisBracket: '\\right)',
        leftSquareBracket: '\\left[',
        rightSquareBracket: '\\right]',
        leftCurlyBracket: '\\left\\{',
        rightCurlyBracket: '\\right\\}',
        leftAngleBracket: '\\left\\langle',
        rightAngleBracket: '\\right\\rangle',
        leftFloorBracket: '\\left\\lfloor',
        rightFloorBracket: '\\right\\rfloor',
        leftCeilBracket: '\\left\\lceil',
        rightCeilBracket: '\\right\\rceil'
    };
    latexString = bracketToLatexMapping[expr.value];
	return latexString;
}

var operatorToLatex = function(expr) {
	var latexString = '';
	var operatorToLatexMapping = {
		'+': '+',
		'−': '-',
		'=': '=',
		'<': '<',
		'>': '>',
		'≤': '\\leq',
		'≥': '\\geq',
		'≈': '\\approx',
		'≡': '\\equiv',
		'≅': '\\cong',
		'≠': '\\neq',
		'∼': '\\sim',
		'∝': '\\propto',
		'≺': '\\prec',
		'⪯': '\\preceq',
		'⊂': '\\subset',
		'⊆': '\\subseteq',
		'≻': '\\succ',
		'⪰': '\\succeq',
		'◦': '\\circ',
		'∈': '\\in',
		'×': '\\times',
		'±': '\\pm',
		'∧': '\\wedge',
		'∨': '\\vee',
		'⊥': '\\perp',
		'∣': '\\mid',
		'∥': '\\parallel',
		':': ':',
		'÷': '\\div',
		'⋅': '\\cdot',
		'=': '='
	};
	latexString = operatorToLatexMapping[expr.value];
	return latexString;
}

var bracketPairToLatex = function(expr) {
	var latexString = '';
	var bracketedExpression = generateLatex(expr.operands.bracketedExpression);
	var bracketPairToLatexMapping = {
        "parenthesisBracket": '\\left(' + bracketedExpression + '\\right)',
        "squareBracket": '\\left[' + bracketedExpression + '\\right]',
        "curlyBracket": '\\left\\{' + bracketedExpression + '\\right\\}',
        "angleBracket": '\\left\\langle' + bracketedExpression + '\\right\\rangle',
        "floorBracket": '\\left\\lfloor' + bracketedExpression + '\\right\\rfloor',
        "ceilBracket": '\\left\\lceil' + bracketedExpression + '\\right\\rceil',
        "absValBracket": '\\left|' + bracketedExpression + '\\right|',
        "normBracket": '\\left\\|' + bracketedExpression + '\\right\\|'
    };
    latexString = bracketPairToLatexMapping[expr.value];
	return latexString;
}

var integralToLatex = function(expr) {
	var latexString = '';
	var lowerLimitString = '';
	var upperLimitString = '';
	if (typeof expr.operands.lowerLimit !== "undefined") {
		lowerLimitString = '_{' + generateLatex(expr.operands.lowerLimit) + '}';
	}
	if (typeof expr.operands.upperLimit !== "undefined") {
		upperLimitString = '^{' + generateLatex(expr.operands.upperLimit) + '}';
	}
	var integralToLatexMapping = {
        'single': '\\int',
        'double': '\\iint',
        'triple': '\\iiint',
        'singleContour': '\\oint',
        'doubleContour': '\\oiint',
        'tripleContour': '\\oiiint'
	};
	latexString = integralToLatexMapping[expr.value] + lowerLimitString + upperLimitString;
	return latexString;
}

var accentToLatex = function(expr) {
	var latexString = '';
	var accentedExpression = '{' + generateLatex(expr.operands.accentedExpression) + '}';
	var accentToLatexMapping = {
		'˙': '\\dot',
		'^': '\\hat',
		'⃗': '\\vec',
		'¯': '\\bar'
	}
	latexString = accentToLatexMapping[expr.value] + accentedExpression;
	return latexString;
}

var functionLowerToLatex = function(expr) {
	var latexString = '';
	var lower = '_{' + generateLatex(expr.operands.lower) + '}';
	latexString = '\\' + expr.value + lower;
	return latexString;
}

var limitToLatex = function(expr) {
	var latexString = '\\lim';
	var lower = '_{' + generateLatex(expr.operands.left) + ' \\to ' + generateLatex(expr.operands.right) + '}';
	latexString += lower;
	return latexString;
}

var logLowerToLatex = function(expr) {
	var latexString = '\\log';
	var lower = '_{' + generateLatex(expr.operands.lower) + '}';
	latexString += lower;
	return latexString;
}

var matrixToLatex = function(expr) {
	var latexString = '\\begin{array}{ccc}';
	for (var j = 0; j < expr.operands.elements.length; j++) {
		var row = expr.operands.elements[j];
		var rowString = '';
		for (var k = 0; k < row.length; k++) {
			rowString += generateLatex(row[k]) + ' & ';
		}
		rowString = rowString.substring(0, rowString.length - 2) + '\\\\\r\n';
		latexString += rowString;
	}
	latexString += '\\end{array}';
	return latexString;
}

var nthRootToLatex = function(expr) {
	var latexString = '\\sqrt';
	var degree = '[' + generateLatex(expr.operands.degree) + ']';
	var radicand = '{' + generateLatex(expr.operands.radicand) + '}';
	latexString += degree + radicand;
	return latexString;
}

var squareRootToLatex = function(expr) {
	var latexString = '\\sqrt';
	var radicand = '{' + generateLatex(expr.operands.radicand) + '}';
	latexString += radicand;
	return latexString;
}

var stackedFractionToLatex = function(expr) {
	var latexString = '\\frac';
	var numerator = '{' + generateLatex(expr.operands.numerator) + '}';
	var denominator = '{' + generateLatex(expr.operands.denominator) + '}';
	latexString += numerator + denominator;
	return latexString;
}

var subscriptToLatex = function(expr) {
	var latexString = '';
	var subscript = '_{' + generateLatex(expr.operands.subscript) + '}';
	latexString += subscript;
	return latexString;
}

var superscriptToLatex = function(expr) {
	var latexString = '';
	var superscript = '^{' + generateLatex(expr.operands.superscript) + '}';
	latexString += superscript;
	return latexString;
}