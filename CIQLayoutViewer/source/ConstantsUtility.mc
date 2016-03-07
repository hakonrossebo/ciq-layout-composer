using Toybox.WatchUi as Ui;
using Toybox.Communications as Comm;
using Toybox.Graphics as Gfx;
using Toybox.System as Sys;
using Toybox.Application as App;

class ConstantsUtility
{
	function getFont(font) {
		if (SupportedFonts.hasKey(font)) {
			return SupportedFonts.get(font);
		}
		else {
			return Gfx.FONT_MEDIUM;
		}	
	}

	function getColor(color) {
		if (SupportedColors.hasKey(color)) {
			return SupportedColors.get(color);
		}
		else {
			return Gfx.COLOR_WHITE;
		}	
	}

	function getTextJustification(justification) {
		if (SupportedTextJustify.hasKey(justification)) {
			return SupportedTextJustify.get(justification);
		}
		else {
			return Gfx.TEXT_JUSTIFY_CENTER;
		}	
	}

	function getArcType(arcType) {
		if (SupportedArcType.hasKey(arcType)) {
			return SupportedArcType.get(arcType);
		}
		else {
			return Gfx.ARC_CLOCKWISE;
		}	
	}

	hidden var SupportedFonts = {
		"FONT_LARGE" => Gfx.FONT_LARGE,
		"FONT_MEDIUM" => Gfx.FONT_MEDIUM,
		"FONT_SMALL" => Gfx.FONT_SMALL,
		"FONT_TINY" => Gfx.FONT_TINY,
		"FONT_XTINY" => Gfx.FONT_XTINY,
		"FONT_NUMBER_HOT" => Gfx.FONT_NUMBER_HOT,
		"FONT_NUMBER_MEDIUM" => Gfx.FONT_NUMBER_MEDIUM,
		"FONT_NUMBER_MILD" => Gfx.FONT_NUMBER_MILD,
		"FONT_NUMBER_THAI_HOT" => Gfx.FONT_NUMBER_THAI_HOT
	};
	hidden var SupportedColors = {
		"COLOR_WHITE" => Gfx.COLOR_WHITE,
		"COLOR_BLACK" => Gfx.COLOR_BLACK,
		"COLOR_BLUE" => Gfx.COLOR_BLUE,
		"COLOR_DK_BLUE" => Gfx.COLOR_DK_BLUE,
		"COLOR_DK_GRAY" => Gfx.COLOR_DK_GRAY,
		"COLOR_DK_GREEN" => Gfx.COLOR_DK_GREEN,
		"COLOR_DK_RED" => Gfx.COLOR_DK_RED,
		"COLOR_GREEN" => Gfx.COLOR_GREEN,
		"COLOR_LT_GRAY" => Gfx.COLOR_LT_GRAY,
		"COLOR_ORANGE" => Gfx.COLOR_ORANGE,
		"COLOR_PINK" => Gfx.COLOR_PINK,
		"COLOR_PURPLE" => Gfx.COLOR_PURPLE,
		"COLOR_RED" => Gfx.COLOR_RED,
		"COLOR_TRANSPARENT" => Gfx.COLOR_TRANSPARENT,
		"COLOR_YELLOW" => Gfx.COLOR_YELLOW
	};
	
	hidden var SupportedTextJustify = {
		"TEXT_JUSTIFY_RIGHT" => Gfx.TEXT_JUSTIFY_RIGHT,
		"TEXT_JUSTIFY_CENTER" => Gfx.TEXT_JUSTIFY_CENTER,
		"TEXT_JUSTIFY_LEFT" => Gfx.TEXT_JUSTIFY_LEFT,
		"TEXT_JUSTIFY_VCENTER" => Gfx.TEXT_JUSTIFY_VCENTER
	};
	
	hidden var SupportedArcType = {
		"ARC_CLOCKWISE" => Gfx.ARC_CLOCKWISE,
		"ARC_COUNTER_CLOCKWISE" => Gfx.ARC_COUNTER_CLOCKWISE
	};
}
