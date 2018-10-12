function go() {
	let obj = $("#originalContent").val();
	if (obj.trim().length == 0) {
		console.error("Need input the content....");
		return false;
	}
	// match the header
	let resArr = obj.split('\n')
		.map(line => line.match(/^(#+)[ \t]+(.*)$/))
		.filter(header => header !== null)
		.map(([allStr, prefix, title]) => ({key: prefix, value: title, level: prefix.length}));
	// generate catalog
	let str = "";
	resArr.map(item => {
		let title = item["value"];
		let anchor = title.toLowerCase().replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '')
			.replace(/ /g, '-');
		let preSpace = "- ";
		// add prefix space
		for (let i = 1; i < item.level; i++) {
			preSpace = '    ' + preSpace;
		}
		// assembly the catalog title
		str += `${preSpace}[${title}](#${anchor})`;
		str += "\n";
	});
	$("#catalogContent").val(str);
}

$("#button").bind("click", function () {
	go();
});
