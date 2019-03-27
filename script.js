let dateOfToday = "2019-02-12";
let dateOfSelected = "";
let calViewState = "week";

let switchDate = date => {
    $("#calendar .date li").removeClass("isSelected");
    $("#calendar .date li")
        .filter((index, element) => {
            return $(element).text() === date.split("-")[2];
        })
        .addClass("isSelected");
    dateOfSelected = date;
    showSchedule(date);
};
let switchCalView = state => {
    if (state === "week") {
        $("#calendar .weekView").show();
        $("#calendar .monthView").hide();
        $("#expandBtn").removeClass();
        $("#expandBtn").addClass("toExpand");
        adjScheduleContent('tall')
    } else if (state === "month") {
        $("#calendar .weekView").hide();
        $("#calendar .monthView").show();
        $("#expandBtn").removeClass();
        $("#expandBtn").addClass("toShrink");
        adjScheduleContent('short')
    }
    calViewState = state;
    return;
};
let showSchedule = date => {
    if (
        $("#calendar .date li:visible")
            .filter((index, element) => {
                return $(element).text() === date.split("-")[2];
            })
            .attr("class")
            .split(" ")
            .indexOf("hasSchedule") === -1
    ) {
        $("#contentList .noSchedule").show();
        $("#contentList ul.contentList").hide();
    } else {
        $("#contentList .noSchedule").hide();
        $("#contentList ul.contentList").show();
    }
};
let adjScheduleContent = height => {
    if (height === "tall") {
        $("#contentList").height(380);
    } else if (height === "short") {
        $("#contentList").height(208);
    }
};

$(() => {
    switchDate(dateOfToday);
    switchCalView(calViewState);
    $("#todayBtn").click(() => {
        switchDate(dateOfToday);
    });
    $("#calendar .date").click(event => {
        if ($(event.target).text() === "") {
            return;
        }
        let dateOfClick = "2019-02-" + $(event.target).text();
        switchDate(dateOfClick);
    });
    $("#expandBtn").click(() => {
        switchCalView(calViewState === "week" ? "month" : "week");
    });
    $("#tabBar li").click(event => {
        $("#tabBar li").removeClass("curTab");
        $(event.currentTarget).addClass("curTab");
    });
    $("#navBar li").click(event => {
        $("#navBar li").removeClass("curNavTab");
        $(event.currentTarget).addClass("curNavTab");
    });
    $("window").on("scroll", () => {
        return;
    });
    $("#contentList").on("scroll", params => {});
});
