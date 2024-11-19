<Form headerText="Test Form" labelSpan="S12 M4 L4 XL4" layout="S1 M1 L2 XL2">
  <FormGroup headerText="Personal Data">
    <FormItem labelContent={<Label>Name</Label>}>
      <Input type="Text" />
    </FormItem>
    <FormItem labelContent={<Label>Address</Label>}>
      <Input type="Text" />
    </FormItem>
    <FormItem labelContent={<Label>Country</Label>}>
      <Select>
        <Option>Germany</Option>
        <Option>France</Option>
        <Option>Italy</Option>
      </Select>
    </FormItem>
  </FormGroup>
</Form>;
