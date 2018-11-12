using Datalist.Web.Datalists;
using Datalist.Web.Models;
using System;
using System.Globalization;
using System.Web.Mvc;

namespace Datalist.Web.Controllers
{
    public class DatalistController : Controller
    {
        [HttpGet]
        public ViewResult Title()
        {
            return View();
        }

        [HttpGet]
        public ViewResult SourceUrl()
        {
            return View();
        }

        [HttpGet]
        public ViewResult Placeholder()
        {
            return View();
        }

        [HttpGet]
        public ViewResult Localization()
        {
            return View();
        }

        [HttpGet]
        public ViewResult HiddenData()
        {
            return View();
        }

        [HttpGet]
        public ViewResult AdditionalFilters()
        {
            return View();
        }

        [HttpGet]
        public ViewResult SortOptions()
        {
            return View();
        }

        [HttpGet]
        public ViewResult ColumnPosition()
        {
            return View();
        }

        [HttpGet]
        public ViewResult ColumnHeader()
        {
            return View();
        }

        [HttpGet]
        public ViewResult PagingOptions()
        {
            return View();
        }


        [HttpGet]
        public ViewResult Id()
        {
            return View();
        }

        [HttpGet]
        public ViewResult Label()
        {
            return View();
        }


        [HttpGet]
        public JsonResult AllPeople(DatalistFilter filter, Int32? autocompleteIncome, Int32? datalistIncome, Boolean? isWorking)
        {
            filter.AdditionalFilters[nameof(Person.IsWorking)] = isWorking;
            filter.AdditionalFilters[nameof(Person.Income)] = autocompleteIncome ?? datalistIncome;

            return Json(new PeopleDatalist { Filter = filter }.GetData(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult LocalizedPeople(DatalistFilter filter)
        {
            CultureInfo.CurrentCulture = new CultureInfo("de");
            CultureInfo.CurrentUICulture = new CultureInfo("de");

            return Json(new PeopleDatalist { Filter = filter }.GetData(), JsonRequestBehavior.AllowGet);
        }
    }
}
