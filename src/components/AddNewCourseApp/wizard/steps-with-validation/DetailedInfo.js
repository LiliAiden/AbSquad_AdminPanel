// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import Select from "react-select";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

const defaultValues = {
  city: "",
  pincode: "",
  address: "",
  landmark: "",
};

import { GetCreateApi } from "../../../../@core/services/API/AllCoursesAdmin/AddNewCourse/add.course.api";
const StandardOptionsForm = (data, itName) => {
  const array = [];
  data.map((it) => {
    array.push({ value: it[`${itName}`], label: it[`${itName}`] });
  });
  return array;
};
const DetailedInfo = ({ stepper }) => {
  // All Details UseStates
  const [courseType, setCourseType] = useState([]);
  const [courseLevel, setCourseLevel] = useState([]);
  const [courseSemester, setCourseSemester] = useState([]);
  const [courseClass, setCourseClass] = useState([]);
  const [courseTeacher, setCourseTeacher] = useState([]);
  const [courseTech, setCourseTech] = useState([]);
  // Get All The Detailed Info Api
  const [getCreate, setGetCreate] = useState({});

  const handleGetCreateApi = async () => {
    const res = await GetCreateApi();
    setGetCreate(res);
  };

  useEffect(() => {
    handleGetCreateApi();
  }, []);

  // Setting Up The UI Options
  useEffect(() => {
    if (JSON.stringify(getCreate) !== "{}") {
      // ** Course Types
      setCourseType(StandardOptionsForm(getCreate.courseTypeDtos, "typeName"));

      // ** Course Level
      setCourseLevel(
        StandardOptionsForm(getCreate.courseLevelDtos, "levelName")
      );
      // ** Course Semester
      setCourseSemester(StandardOptionsForm(getCreate.termDtos, "termName"));

      // ** Course Class
      setCourseClass(
        StandardOptionsForm(getCreate.classRoomDtos, "classRoomName")
      );

      // ** Course Teacher
      setCourseTeacher(StandardOptionsForm(getCreate.teachers, "fullName"));

      // ** Course Technologies
      setCourseTech(StandardOptionsForm(getCreate.technologyDtos, "techName"));
    }
  }, [getCreate]);

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      stepper.next();
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
            message: `Please enter a valid ${key}`,
          });
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات تکمیلی دوره</h5>
        <small>اطلاعات دقیق تری از دوره را وارد کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">نحوه برگذاری دوره</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={courseType}
              isClearable={false}
            />
          </Col>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">سطح دوره</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={courseLevel}
              isClearable={false}
            />
          </Col>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">ترم دوره</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={courseSemester}
              isClearable={false}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">شماره کلاس</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={courseClass}
              isClearable={false}
            />
          </Col>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">استاد دوره</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={courseTeacher}
              isClearable={false}
            />
          </Col>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label">تکنولوژی دوره</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={courseTech}
              isClearable={false}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default DetailedInfo;